// https://developer.mozilla.org/en-US/docs/Web/API/notification
export default function notifyMe(title: string, body?: string, url?: string) {
    function createNotification(title: string, body?: string, url?: string): Notification {
        let notification = new Notification(title, {body: body})
        notification.onclick = (event) => {
            event.preventDefault();
            window.open(url, '_blank')
        }
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                // The tab has become visible so clear the now-stale Notification.
                notification.close();
            }
        });
        return notification
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        // Do nothing
        return
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        return createNotification(title, body, url)
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                return createNotification(title, body, url)
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}