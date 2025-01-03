package trade.smart.stock.options.app;

import android.os.Bundle;

import org.apache.cordova.*;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.moengage.cordova.MoEInitializer;
import com.moengage.core.MoEngage;
import com.moengage.cordova.MoEInitializer;
import com.moengage.core.MoEngage;
import com.moengage.core.config.FcmConfig;
import com.moengage.core.config.LogConfig;
import com.moengage.core.config.NotificationConfig;
import com.moengage.core.*;
import com.moengage.core.DataCenter;


public class MoengageApplication extends Application
{
    @Override
    public void onCreate()
    {
        super.onCreate();

        MoEngage.Builder moEngage = new MoEngage.Builder(this, "Y9114ZCMAWIAS7A08IV94UNJ",DataCenter.DATA_CENTER_3)
                                                .configureLogs(new LogConfig(LogLevel.VERBOSE, true))
                                                .configureNotificationMetaData(new NotificationConfig(R.mipmap.ic_launcher, R.mipmap.ic_launcher, -1, true, false, true));
        MoEInitializer.initialiseDefaultInstance(getApplicationContext(), moEngage);
    }
}
