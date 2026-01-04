package app.dicty.plugins.payment;

import androidx.annotation.NonNull;

public enum GooglePayEvents {
    Completed("completed"),
    Cancelled("cancelled"),
    Failed("failed");

    private final String stringValue;

    GooglePayEvents(String toString) {
        stringValue = toString;
    }

    @NonNull
    @Override
    public String toString() {
        return stringValue;
    }
}
