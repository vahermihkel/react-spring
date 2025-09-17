package ee.mihkel.webshop_backend.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class CronService {

    // * - second
    // * * - minute
    // * * * - hour
    // * * * * - kuupäev
    // * * * * * - kuu
    // * * * * * * - nädalapäev
//    @Scheduled(cron = "*/2 * * * * *")
//    public void startCron() {
//        log.info("Starting request every two seconds");
//    }

}
