package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    registerPlugin(com.capacitorjs.plugins.storage.StoragePlugin.class);
    registerPlugin(com.capacitorjs.plugins.actionsheet.ActionSheetPlugin.class);
    registerPlugin(com.capacitorjs.plugins.dialog.DialogPlugin.class);
    registerPlugin(com.capacitorjs.plugins.haptics.HapticsPlugin.class);
    registerPlugin(com.capacitorjs.plugins.screenreader.ScreenReaderPlugin.class);
    registerPlugin(com.capacitorjs.plugins.toast.ToastPlugin.class);
  }
}
