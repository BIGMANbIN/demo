package com.example.web.util;


import com.amaz.core.common.DateUtils;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.Date;

@Component
@Configurable
@EnableScheduling
public class ScheduledTasks {

//    @Inject
//    private RealTimeDataService realTimeDataService;
//
//    //每5分钟执行一次
//    @Scheduled(cron = "0 */5 8-23  * * * ")
//    public void reportCurrentByCron() throws Exception {
//        String data = realTimeDataService.userNumber();
//        realTimeDataService.create(DateUtils.format(DateUtils.format2date(new Date(), "yyyy-MM-dd HH:mm"), "yyyy-MM-dd HH:mm"), data);
//
//    }
}


