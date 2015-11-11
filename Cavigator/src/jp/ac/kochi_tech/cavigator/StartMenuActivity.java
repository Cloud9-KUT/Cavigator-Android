package jp.ac.kochi_tech.cavigator;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;


public class StartMenuActivity extends Activity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTitle("Start Menu");
        // Keep screen on
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setContentView(R.layout.activity_start_menu);
        
        Button buttonStart = (Button)findViewById(R.id.how);
        buttonStart.setOnClickListener(this);
        
        TextView versionTextView = (TextView)findViewById(R.id.startMenuVersionTextView);
        versionTextView.setText("Ver. " + getVersionName(this));
        
        if (!isBooted()) {
            Intent intent = new Intent(StartMenuActivity.this, LanguageDownloadActivity.class);
            startActivity(intent);
        }
    }

    public void onClick(View v) {
        Intent intent = null;
        switch (v.getId()) {
        case R.id.how:
            intent = new Intent(StartMenuActivity.this, HowToListActivity.class);
            break;
            
        case R.id.change:
            intent = new Intent(StartMenuActivity.this, LanguageDownloadActivity.class);
            break;
            
        case R.id.info:
            intent = new Intent(StartMenuActivity.this, InformationListActivity.class);
            break;
            
        case R.id.start:
            intent = new Intent(StartMenuActivity.this, VoiceNavigationActivity.class);
            break;
        }
        if (intent != null) {
            startActivity(intent);
        }
    }
    
    private boolean isBooted() {
        SharedPreferences preference;
        preference = getSharedPreferences("Launched", MODE_PRIVATE);
        
        // 初回起動ならfalse
        if (preference.getBoolean("Launched", false)==false) {
            return false;
        }
        // ２回め以降の起動ならtrue
        return true;
    }
    
  //終了確認ダイアログの生成
    private static final int DIALOG_YES_NO_MESSAGE = 0;

    @SuppressWarnings("deprecation")
    @Override
    public void finish() {
        showDialog(DIALOG_YES_NO_MESSAGE);
    }

    // Activityクラスのfinishメソッドを呼ぶメソッドを新規で追加
    public void appEnd() {
        moveTaskToBack(true);
    }

    // ActivityクラスのonCreateDialogをオーバーライド
    @Override
    protected Dialog onCreateDialog(int id) {
        switch (id)

        {
        case DIALOG_YES_NO_MESSAGE:
            return new AlertDialog.Builder(this)
                    //.setTitle("Exit confirmation")
                    .setMessage("Are you sure you want to exit application?")
                    .setPositiveButton("OK",
                            new DialogInterface.OnClickListener() {

                                public void onClick(DialogInterface dialog,
                                        int whichButton) {
                                    // アプリ終了
                                    appEnd();
                                }
                            })
                    .setNegativeButton("CANCEL",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog,
                                        int whichButton) {

                                }
                            }).create();
        }
        return null;
    }
    
    public static String getVersionName(Context context){
        PackageManager pm = context.getPackageManager();
        String versionName = "";
        try{
            PackageInfo packageInfo = pm.getPackageInfo(context.getPackageName(), 0);
            versionName = packageInfo.versionName;
        }catch(NameNotFoundException e){
            e.printStackTrace();
        }
        return versionName;
    }

    
    
    // オプションメニューの生成
    //public static final int START_MENU = 0;
    public static final int VOICE_GUIDE = 1;
    public static final int INFORMATION = 2;
    public static final int SELECT_LANGUAGE = 3;
    public static final int HOW_TO_USE = 4;
    
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //menu.add(0, START_MENU, 0, "Start Menu");
        menu.add(0, VOICE_GUIDE, 0, "Voice Guidance");
        menu.add(0, INFORMATION, 0, "Text Guidance");
        menu.add(0, SELECT_LANGUAGE, 0, "Select Language");
        menu.add(0, HOW_TO_USE, 0, "Help");
        return true;
    }
    

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent intent;
        switch (item.getItemId()) {
        /*case START_MENU:
            intent = new Intent(this, StartMenuActivity.class);
            startActivity(intent);
            return true;*/
            
        case VOICE_GUIDE:
            intent = new Intent(this, VoiceNavigationActivity.class);
            startActivity(intent);
            return true;
            
        case INFORMATION:
            intent = new Intent(this, InformationListActivity.class);
            startActivity(intent);
            return true;
            
        case SELECT_LANGUAGE:
            intent = new Intent(this, LanguageDownloadActivity.class);
            startActivity(intent);
            return true;
            
        case HOW_TO_USE:
            intent = new Intent(this, HowToListActivity.class);
            startActivity(intent);
            return true;
        
        case android.R.id.home:
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
    
}
