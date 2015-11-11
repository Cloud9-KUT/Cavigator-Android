package jp.ac.kochi_tech.cavigator;

import java.io.InputStream;
import java.util.ArrayList;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.os.Bundle;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;

public class HowToDispActivity extends Activity {
    int num;
    boolean windowFirstViewFlag;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
	    // アイコンに戻る機能の追加
        getActionBar().setDisplayHomeAsUpEnabled(true); 
		super.onCreate(savedInstanceState);
        setTitle("Help");
        // Keep screen on
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		setContentView(R.layout.activity_how_to_disp);
		
		// 画像の再描画を防ぐためのフラグ
		windowFirstViewFlag = true;
		
		Bundle extra = getIntent().getExtras();
		num = (int) extra.getInt("SELECT");
		
	}
	
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {

        if (windowFirstViewFlag) {
            LinearLayout linearLayout = (LinearLayout)findViewById(R.id.howToDispLinearLayout1);
            HorizontalScrollView horizontalScrollView = (HorizontalScrollView)findViewById(R.id.howToDispHorizontalScrollView1);

            ArrayList<InputStream> imagePath = new ArrayList<InputStream>();
            try {
                switch (num) {
                case 0:
                    imagePath.add(getResources().getAssets().open(
                            "howToImages/voiceGuide.jpg"));
                    break;
                case 1:
                    imagePath.add(getResources().getAssets().open(
                            "howToImages/information0.jpg"));
                    imagePath.add(getResources().getAssets().open(
                            "howToImages/information1.jpg"));
                    break;
                case 2:
                    imagePath.add(getResources().getAssets().open(
                            "howToImages/selectLanguage.jpg"));
                    break;
                }
            } catch (Exception e) {
            }

            // 画面のサイズを取得
            Display display = getWindowManager().getDefaultDisplay();
            Point p = new Point();
            display.getSize(p);

            for (int i = 0; i < imagePath.size(); i++) {
                // 画像を表示
                View v = this.getLayoutInflater().inflate(
                        R.layout.information_disp_column, null);
                ImageView imageView = (ImageView)v
                        .findViewById(R.id.informationDispRowImageView1);

                final BitmapFactory.Options options = new BitmapFactory.Options();
                options.inJustDecodeBounds = true;
                BitmapFactory.decodeStream(imagePath.get(i));
                options.inSampleSize = calculateInSampleSize(options, p.x,
                        linearLayout.getHeight());
                options.inJustDecodeBounds = false;

                Bitmap bmp = BitmapFactory.decodeStream(imagePath.get(i));
                imageView.setImageBitmap(bmp);
                imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
                ViewGroup.LayoutParams params = imageView.getLayoutParams();

                params.width = horizontalScrollView.getWidth();
                params.height = horizontalScrollView.getChildAt(0).getHeight();

                imageView.setLayoutParams(params);

                linearLayout.addView(v);

            }
            windowFirstViewFlag = false;
        }
    }
	    
	    public static int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {  
	        
	        // 画像の元サイズ  
	        final int height = options.outHeight;  
	        final int width = options.outWidth;  
	        int inSampleSize = 1;  
	      
	        if (height > reqHeight || width > reqWidth) {  
	            if (width > height) {  
	                inSampleSize = Math.round((float)height / (float)reqHeight);  
	            } else {  
	                inSampleSize = Math.round((float)width / (float)reqWidth);  
	            }  
	        }  
	        return inSampleSize;  
	    }
	
	// HowToテキストの表示
	/*public void showText(int num) {
		InputStream inputStream = null;
		BufferedReader br = null;
		String text = "";
		File srcFile = new File(this.getApplicationInfo().dataDir + 
				"/files/English/sample" + num + ".txt");
		
		try {
			inputStream = new FileInputStream(srcFile);
			br = new BufferedReader(new InputStreamReader(inputStream));
		
			String str;
			while ((str = br.readLine()) != null) {
				text += str + "\n";
			}
		} catch (Exception e) {
		}
		
		TextView textView = (TextView) findViewById(R.id.howToTextView1);
		textView.setText(text);
		
	}*/

	/*@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.how_to, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
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
    public static final int HOW_TO_USE = 4;
    
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add(0, START_MENU, 0, "Start Menu");
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
