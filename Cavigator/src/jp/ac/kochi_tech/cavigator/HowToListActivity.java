package jp.ac.kochi_tech.cavigator;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;


public class HowToListActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // アイコンに戻る機能の追加
        getActionBar().setDisplayHomeAsUpEnabled(true); 
        super.onCreate(savedInstanceState);
        setTitle("Help");
        // Keep screen on
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        setContentView(R.layout.activity_how_to_list);
        
        // リストビュー生成
        ListViewSet();
        ListView lv = (ListView) findViewById(R.id.howToListView1);
        lv.setOnItemClickListener(new ListItemClickListener());
    }
    
    // リストビューセットメソッド
    public void ListViewSet() {
        // ArrayList作成:これに表示したい要素を格納する
        ArrayList<String> alist = new ArrayList<String>();
        /*String language = "English";
        
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader
                    (new FileInputStream(HowToListActivity.this.getFilesDir().getAbsolutePath()
                            + "/" + language + "/howto.txt"), "UTF-8"));
            
            String line;
            //URLを記述したテキストの最後の行までループ
            while ((line = br.readLine()) != null) {
                alist.add(line);
            }
            
            br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        
        alist.add("Voice Guidance");
        alist.add("Text Guidance");
        alist.add("Select Language");
        
        // アレイアダプタの生成
        ArrayAdapter<String> la = new ArrayAdapter<String>
            (this, android.R.layout.simple_list_item_1, alist);
        
        ListView listView = (ListView) findViewById(R.id.howToListView1);
        listView.setAdapter(la);
    }
    
    // リストビューアイテムクリックリスナークラス
    // srcFiles:ダウンロード先URL, dstDir:保存ディレクトリ
    class ListItemClickListener implements OnItemClickListener {
        // アイテムクリック時に呼び出されるメソッド
        public void onItemClick(AdapterView<?> parent, View view,
                int position, long id) {
            
            Intent intent = new Intent (HowToListActivity.this, HowToDispActivity.class);
            // 選択位置を渡す
            intent.putExtra("SELECT", position);
            // アクティビティスタート
            startActivity(intent);
            
        }
    }


    /*@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }*/
    
    
    // オプションメニューの生成
    public static final int START_MENU = 0;
    public static final int VOICE_GUIDE = 1;
    public static final int INFORMATION = 2;
    public static final int SELECT_LANGUAGE = 3;
    //public static final int HOW_TO_USE = 4;
    
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add(0, START_MENU, 0, "Start Menu");
        menu.add(0, VOICE_GUIDE, 0, "Voice Guidance");
        menu.add(0, INFORMATION, 0, "Text Guidance");
        menu.add(0, SELECT_LANGUAGE, 0, "Select Language");
        //menu.add(0, HOW_TO_USE, 0, "Help");
        return true;
    }
    

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent intent;
        switch (item.getItemId()) {
        case START_MENU:
            intent = new Intent(this, StartMenuActivity.class);
            startActivity(intent);
            return true;
            
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
            
        /*case HOW_TO_USE:
            intent = new Intent(this, HowToListActivity.class);
            startActivity(intent);
            return true;*/
        
        case android.R.id.home:
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
    
}
