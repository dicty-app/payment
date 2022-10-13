package app.dicty.plugins.stripe;

enum class GooglePayEvents(val webEventName: String) {
    Completed("completed"),
    Cancelled("cancelled"),
    Failed("failed"),
}
