//#import "AppDelegate.h"
//#import <React/RCTBundleURLProvider.h>
//
//@implementation AppDelegate
//
//- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
//{
//  self.moduleName = @"IdealKredit";
//  // You can add your custom initial props in the dictionary below.
//  // They will be passed down to the ViewController used by React Native.
//  self.initialProps = @{};
//
//  return [super application:application didFinishLaunchingWithOptions:launchOptions];
//}
//
//- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
//{
//  return [self bundleURL];
//}
//
//- (NSURL *)bundleURL
//{
//#if DEBUG
//  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
//#else
//  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//#endif
//}
//
//@end


#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface AppDelegate () <RCTBridgeDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Создаем RCTBridge
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

  // Создаем RCTRootView
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"IdealKredit"
                                            initialProperties:nil];

  // Настраиваем фон
  rootView.backgroundColor = [UIColor whiteColor];

  // Создаем rootViewController
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;

  // Создаем UINavigationController
  UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:rootViewController];

  // Скрываем навигационную панель
  navController.navigationBarHidden = YES;

  // Настраиваем окно
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = navController;
  [self.window makeKeyAndVisible];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
