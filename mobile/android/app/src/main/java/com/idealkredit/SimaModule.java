package com.idealkredit;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.HashMap;
import java.util.logging.Logger;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatEditText;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.WritableMap;
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader;
import com.tom_roush.pdfbox.io.IOUtils;
import com.tom_roush.pdfbox.pdmodel.PDDocument;
import com.tom_roush.pdfbox.pdmodel.PDPage;
import com.tom_roush.pdfbox.pdmodel.PDPageContentStream;
import com.tom_roush.pdfbox.pdmodel.font.PDFont;
import com.tom_roush.pdfbox.pdmodel.font.PDType1Font;
import com.tom_roush.pdfbox.pdmodel.interactive.digitalsignature.PDSignature;

import org.apache.commons.io.FileUtils;
import org.spongycastle.cert.X509CertificateHolder;
import org.spongycastle.cms.CMSProcessable;
import org.spongycastle.cms.CMSProcessableByteArray;
import org.spongycastle.cms.CMSSignedData;
import org.spongycastle.cms.SignerInformation;
import org.spongycastle.cms.SignerInformationVerifier;
import org.spongycastle.cms.jcajce.JcaSimpleSignerInfoVerifierBuilder;
import org.spongycastle.util.Store;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import android.content.pm.PackageInfo; 
import android.content.pm.PackageManager;
import java.util.List;
import android.content.pm.ApplicationInfo;

public class SimaModule extends ReactContextBaseJavaModule {

    public final String FIN_CODE_MUST_NOT_BE_EMPTY = "FIN code must not be empty:";    
    private final String PACKAGE_NAME = "az.dpc.sima";//az.dpc.sima
    private final String SIGN_PDF_OPERATION = "sima.sign.pdf"; // operation type to sign pdf
    private final String SIGN_CHALLENGE_OPERATION = "sima.sign.challenge"; // operation type to sign challenge

    private final String SIMA_SIGNATURE_ALGORITHM = "SHA256withECDSA";
    private final String CLIENT_SIGNATURE_ALGORITHM = "HmacSHA256";
    private final String CLIENT_HASH_ALGORITHM = "SHA-256";
    private final String CLIENT_MASTER_KEY = "441DD043-328C-4FD3-9D2D-8B120106D0D8"; // your master key

    // Intent field names
    private final String EXTRA_CLIENT_ID_FIELD = "client_id";
    private final String EXTRA_SERVICE_FIELD = "service_name";
    private final String EXTRA_CHALLENGE_FIELD = "challenge";
    private final String EXTRA_SIGNATURE_FIELD = "signature";
    private final String EXTRA_USER_CODE_FIELD = "user_code";
    private final String EXTRA_REQUEST_ID_FIELD = "request_id";
    private final String EXTRA_LOGO_FIELD = "service_logo";

    private final int EXTRA_CLIENT_ID_VALUE = 3144201; // your client id
    private final String EXTRA_SERVICE_VALUE = "ESAM Kredit"; // service name to be displayed
    private String EXTRA_USER_CODE_VALUE = "fin code here"; // user FIN code

    private final ReactApplicationContext reactContext;
    private Promise signChallengePromise;
    private byte[] challenge;

    SimaModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.reactContext.addActivityEventListener(new MyAppActivityEventListener());
    }

    @Override
    public String getName() {
        return "SimaModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String initialize(String username, String password, double clientid, String language) {
        Logger.getLogger("SimaModule").info("initialize ok");
        return "initialize OK";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String register() {
        Logger.getLogger("SimaModule").info("register ok");
        return "register OK";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String loginWithSima(String challengeStr) {
        byte[] challenge = challengeStr.getBytes(StandardCharsets.UTF_8);

        Logger.getLogger("SimaModule").info("register ok");
        return "register OK";
    }

    @ReactMethod
    public void signChallenge(String challengeStr, String finCode, Promise promise) {
        try {
           
            if (challengeStr.isEmpty()) {
                Toast.makeText(getReactApplicationContext(), "Challenge code must not be empty", Toast.LENGTH_LONG).show();
                promise.reject("CHALLENGE_CODE_EMPTY", "Challenge code must not be empty");
                return;
            }
            challenge = challengeStr.getBytes(StandardCharsets.UTF_8);     

             Intent intent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(PACKAGE_NAME); 
            
            if(intent == null){
                // Paket adlarını kontrol etme
                PackageManager pm = getCurrentActivity().getPackageManager();
                List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
                for (ApplicationInfo packageInfo : packages) {                
                    if (packageInfo.packageName.equals(PACKAGE_NAME)) {
                        intent = pm.getLaunchIntentForPackage(PACKAGE_NAME);
                    }
                }
            }

            String intentName = intent == null ? "null" : intent.toString();
            System.out.println("1:"+ intentName);
            if (intent == null) 
            {      
                intent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + PACKAGE_NAME));
                if(intent == null){
                    promise.reject("SIGN_CHALLENGE_ERROR", "Intent is null");
                }                
                // intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id="+PACKAGE_NAME)); 
                // intentName = intent == null ? "null" : intent.toString();
                // System.out.println("2:"+ intentName);
            } 
            else {
                MessageDigest md = MessageDigest.getInstance(CLIENT_HASH_ALGORITHM);
                md.update(challenge);
                byte[] hash = md.digest();

                Mac mac = Mac.getInstance(CLIENT_SIGNATURE_ALGORITHM);
                mac.init(new SecretKeySpec(CLIENT_MASTER_KEY.getBytes(), CLIENT_SIGNATURE_ALGORITHM));
                byte[] signature = mac.doFinal(hash);

                String uuid = UUID.randomUUID().toString();
                String logo = getLogo();

                intent = intent.setAction(SIGN_CHALLENGE_OPERATION).setFlags(0)
                        .addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                        .putExtra(EXTRA_CHALLENGE_FIELD, challenge)
                        .putExtra(EXTRA_SERVICE_FIELD, EXTRA_SERVICE_VALUE)
                        .putExtra(EXTRA_CLIENT_ID_FIELD, EXTRA_CLIENT_ID_VALUE)
                        .putExtra(EXTRA_SIGNATURE_FIELD, signature)
                        .putExtra(EXTRA_LOGO_FIELD, logo)
                        .putExtra(EXTRA_REQUEST_ID_FIELD, uuid);
                if(finCode != null && !finCode.isEmpty()){
                    intent.putExtra(EXTRA_USER_CODE_FIELD, finCode.trim());
                }
            }
            signChallengePromise = promise;
            getCurrentActivity().startActivityForResult(intent, 1);
        } catch (Exception e) {
            promise.reject("SIGN_CHALLENGE_ERROR", e);
        }
    }

   /* @ReactMethod
    public void signPDF(String pdfB64Str, String fileName, String finCode, Promise promise) {
        try {
            if (pdfB64Str.isEmpty()) {
                Toast.makeText(getReactApplicationContext(), "Challenge code must not be empty", Toast.LENGTH_LONG).show();
                promise.reject("CHALLENGE_CODE_EMPTY", "Challenge code must not be empty");
                return;
            }
            challenge = Base64.decode(pdfB64Str, Base64.NO_PADDING);
            Intent intent = null;
            try {
                intent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + PACKAGE_NAME));
            }catch (Exception e){
            }
            if (intent == null) {
                intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + PACKAGE_NAME));
            } else {
                MessageDigest md = MessageDigest.getInstance(CLIENT_HASH_ALGORITHM);
                md.update(challenge);
                byte[] hash = md.digest();

                Mac mac = Mac.getInstance(CLIENT_SIGNATURE_ALGORITHM);
                mac.init(new SecretKeySpec(CLIENT_MASTER_KEY.getBytes(), CLIENT_SIGNATURE_ALGORITHM));
                byte[] signature = mac.doFinal(hash);

                String uuid = UUID.randomUUID().toString();
                String logo = getLogo();

                intent = intent.setAction(SIGN_PDF_OPERATION).setFlags(0)
                        .setData(new Uri(pdfB64Str))
                        .addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                        .putExtra(EXTRA_SERVICE_FIELD, EXTRA_SERVICE_VALUE)
                        .putExtra(EXTRA_CLIENT_ID_FIELD, EXTRA_CLIENT_ID_VALUE)
                        .putExtra(EXTRA_SIGNATURE_FIELD, documentSignature)
                        .putExtra(EXTRA_LOGO_FIELD, logo)
                        .putExtra(EXTRA_USER_CODE_FIELD, EXTRA_USER_CODE_VALUE)
                        .putExtra(EXTRA_REQUEST_ID_FIELD, uuid);
                if(finCode != null && !finCode.isEmpty()){
                    intent.putExtra(EXTRA_USER_CODE_FIELD, finCode.trim());
                }
            }
            signChallengePromise = promise;
            getCurrentActivity().startActivityForResult(intent, 1);
        } catch (Exception e) {
            promise.reject("SIGN_CHALLENGE_ERROR", e);
        }
    }*/

    private String getLogo() throws IOException {
        AssetManager assetManager = getCurrentActivity().getAssets();
        InputStream logoFile = assetManager.open("logo.png");
        Bitmap bitmap = BitmapFactory.decodeStream(logoFile);
        logoFile.close();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();

        return "data:image/jpeg;base64," + Base64.encodeToString(byteArray, Base64.NO_PADDING);
    }

    private class MyAppActivityEventListener extends BaseActivityEventListener {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent data) {
            if (requestCode == 1) {
                if (signChallengePromise != null) {
                    if (resultCode == Activity.RESULT_OK) {
                        try {
                            if (data == null) {
                                handleError("empty-response");
                                return;
                            }

                            String status = data.getStringExtra("status");
                            String message = data.getStringExtra("message");

                            if (status == null || !status.equals("success")) {
                                handleError(message);
                                return;
                            }

                            byte[] signatureBytes = data.getByteArrayExtra("signature");
                            byte[] certificateBytes = data.getByteArrayExtra("certificate");

                            CertificateFactory cf = CertificateFactory.getInstance("X.509");
                            InputStream certStream = new ByteArrayInputStream(certificateBytes);
                            X509Certificate certificate = (X509Certificate) cf.generateCertificate(certStream);

                            Signature s = Signature.getInstance(SIMA_SIGNATURE_ALGORITHM);
                            s.initVerify(certificate);
                            s.update(challenge);

                            if (s.verify(signatureBytes)) {
                                WritableMap resultMap = Arguments.createMap();
                                resultMap.putString("subject", certificate.getSubjectDN().toString());
                                signChallengePromise.resolve(resultMap);
                            } else {
                                handleError("signature-verification-error");
                            }
                        } catch (Exception e) {
                            handleError("parse-result-error");
                        }
                    } else if (resultCode == Activity.RESULT_CANCELED) {
                        handleError("operation-canceled");
                    }
                    signChallengePromise = null;
                }
            }
        }

        private void handleError(String message) {
            if (signChallengePromise != null) {
                signChallengePromise.reject("SIGN_CHALLENGE_ERROR", message);
                signChallengePromise = null;
            }
        }
    }
}
