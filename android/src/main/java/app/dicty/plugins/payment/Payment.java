package app.dicty.plugins.payment;

import com.getcapacitor.Logger;

public class Payment {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
