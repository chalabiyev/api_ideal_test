//import Foundation
//import React
//import SimaSDK
//
//@objc(SimaModule)
//class SimaModule: NSObject {
//    private var sima: Sima?
//    
//    @objc
//    static func requiresMainQueueSetup() -> Bool {
//        return true
//    }
//    
//    /// Метод для инициализации Sima SDK
//    /// - Parameters:
//    ///   - username: Имя пользователя для SDK
//    ///   - password: Пароль для SDK
//    ///   - language: Язык интерфейса ('en', 'ru', 'az')
//    ///   - resolver: Блок для успешного завершения
//    ///   - rejecter: Блок для обработки ошибок
//    @objc
//    func initialize(_ username: String,
//                    password: String,
//                    language: String,
//                    resolver: @escaping RCTPromiseResolveBlock,
//                    rejecter: @escaping RCTPromiseRejectBlock) {
//        
//        // Поскольку конструктор принимает только username и password, language не может быть установлен через свойство
//        // Если SDK предоставляет метод для установки языка, можно его вызвать здесь
//        // Иначе, оставить язык по умолчанию или не устанавливать
//        // Предположим, что язык нельзя установить отдельно
//        
//        DispatchQueue.main.async {
//            // Инициализация Sima с username и password
//            self.sima = Sima(username: username, password: password)
//            
//            // Если SDK предоставляет метод для установки языка, вызовите его здесь
//            // Например:
//            // self.sima?.setLanguage(language: simaLanguage)
//            // Однако, если такого метода нет, пропустите установку языка
//            
//            if self.sima != nil {
//                print("SDK инициализирован успешно")
//                resolver("SDK initialized successfully")
//            } else {
//                let error = NSError(domain: "SimaModule", code: 0, userInfo: [NSLocalizedDescriptionKey: "Не удалось инициализировать Sima SDK"])
//                rejecter("E_SDK_INIT_FAILED", error.localizedDescription, error)
//            }
//        }
//    }
//    
//    /// Метод для регистрации пользователя через Sima SDK
//    /// - Parameters:
//    ///   - resolver: Блок для успешного завершения
//    ///   - rejecter: Блок для обработки ошибок
//    @objc
//    func register(_ resolver: @escaping RCTPromiseResolveBlock,
//                  rejecter: @escaping RCTPromiseRejectBlock) {
//        guard let sima = self.sima else {
//            rejecter("E_NO_SIMA_INSTANCE", "Sima instance not initialized", nil)
//            return
//        }
//        
//        guard let senderVC = self.getRootViewController() else {
//            rejecter("E_NO_ROOT_VIEW_CONTROLLER", "Unable to get root view controller", nil)
//            return
//        }
//        
//        DispatchQueue.main.async {
//            sima.register(senderVC: senderVC) { result in
//                switch result {
//                case .success():
//                    resolver("Регистрация успешна")
//                case .failure(let error):
//                    // Обработка ошибок, предоставляемых SDK
//                    rejecter("E_REGISTRATION_FAILED", error.localizedDescription, error)
//                }
//            }
//        }
//    }
//    
//    /// Вспомогательный метод для получения rootViewController
//    private func getRootViewController() -> UIViewController? {
//        if #available(iOS 13.0, *) {
//            // Для iOS 13 и выше
//            return UIApplication.shared.connectedScenes
//                .filter { $0.activationState == .foregroundActive }
//                .compactMap { $0 as? UIWindowScene }
//                .flatMap { $0.windows }
//                .first { $0.isKeyWindow }?.rootViewController
//        } else {
//            // Для iOS ниже 13
//            return UIApplication.shared.keyWindow?.rootViewController
//        }
//    }
//}




import Foundation
import React
import SimaSDK

@objc(SimaModule)
class SimaModule: NSObject {
    private var sima: Sima?
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    /// Метод для инициализации Sima SDK
    /// - Parameters:
    ///   - username: Имя пользователя для SDK
    ///   - password: Пароль для SDK
    ///   - language: Язык интерфейса ('en', 'ru', 'az')
    ///   - resolver: Блок для успешного завершения
    ///   - rejecter: Блок для обработки ошибок
    @objc
    func initialize(_ username: String,
                    password: String,
                    language: String,
                    resolver: @escaping RCTPromiseResolveBlock,
                    rejecter: @escaping RCTPromiseRejectBlock) {
        
        let simaLanguage: LanguageSima
        switch language.lowercased() {
        case "en":
            simaLanguage = .en
        case "ru":
            simaLanguage = .ru
        case "az":
            simaLanguage = .az
        default:
            simaLanguage = .en
        }
        
        DispatchQueue.main.async {
            // Инициализация Sima с username и password
            self.sima = Sima(username: username, password: password, language: simaLanguage)
            
            if self.sima != nil {
                print("SDK инициализирован успешно")
                resolver("SDK initialized successfully")
            } else {
                let error = NSError(domain: "SimaModule", code: 0, userInfo: [NSLocalizedDescriptionKey: "Не удалось инициализировать Sima SDK"])
                rejecter("E_SDK_INIT_FAILED", error.localizedDescription, error)
            }
        }
    }
    
    /// Метод для регистрации пользователя через Sima SDK
    /// - Parameters:
    ///   - resolver: Блок для успешного завершения
    ///   - rejecter: Блок для обработки ошибок
    @objc
    func register(_ resolver: @escaping RCTPromiseResolveBlock,
                  rejecter: @escaping RCTPromiseRejectBlock) {
        guard let sima = self.sima else {
            rejecter("E_NO_SIMA_INSTANCE", "Sima instance not initialized", nil)
            return
        }
        
        guard let senderVC = self.getTopViewController() else {
            rejecter("E_NO_TOP_VIEW_CONTROLLER", "Unable to get top view controller", nil)
            return
        }
        
        DispatchQueue.main.async {
            print("Начинаем регистрацию через Sima SDK")
            sima.register(senderVC: senderVC) { result in
                switch result {
                case .success():
                    print("Регистрация успешна")
                    resolver("Регистрация успешна")
                case .failure(let error):
                    print("Ошибка регистрации: \(error.localizedDescription)")
                    rejecter("E_REGISTRATION_FAILED", error.localizedDescription, error)
                }
            }
        }
    }
    
    /// Вспомогательный метод для получения верхнего (top) view controller
    private func getTopViewController() -> UIViewController? {
        guard let keyWindow = UIApplication.shared.windows.first(where: { $0.isKeyWindow }),
              let rootViewController = keyWindow.rootViewController else {
            return nil
        }
        
        var topVC = rootViewController
        while let presentedVC = topVC.presentedViewController {
            topVC = presentedVC
        }
        return topVC
    }
}
