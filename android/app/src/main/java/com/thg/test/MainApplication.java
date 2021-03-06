package com.thg.test;
import android.app.Application;
import com.crashlytics.android.Crashlytics;
//import com.crashlytics.android.ndk.CrashlyticsNdk;
import com.facebook.react.ReactApplication;
import com.smixx.fabric.FabricPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.tron.ReactNativeWheelPickerPackage;
import io.fabric.sdk.android.Fabric;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.smixx.fabric.FabricPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FabricPackage(),
            new RNDeviceInfo(),
            new ReactNativeWheelPickerPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new RNSecureKeyStorePackage()
           
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
     Fabric.with(this, new Crashlytics());
   
    SoLoader.init(this, /* native exopackage */ false);
  }





}
