#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SimaModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)username
                  password:(NSString *)password
                  language:(NSString *)language
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

RCT_EXTERN_METHOD(register:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

@end
