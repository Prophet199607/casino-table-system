import { useEffect, useState } from "react";
import { THEME } from "../../constants/theme";

export const Toolbar = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ borderBottom: `1px solid ${THEME.color.stroke}` }}
    >
      <div
        className="flex items-center px-4 py-3 gap-4"
        style={{ borderBottom: `1px solid ${THEME.color.stroke}` }}
      >
        <span
          className="font-semibold"
          style={{ fontSize: THEME.font.size.sm }}
        >
          Date:
        </span>
        <span style={{ fontSize: THEME.font.size.xs }}>{formattedDate}</span>

        <span
          className="font-semibold"
          style={{ fontSize: THEME.font.size.sm }}
        >
          Time:
        </span>
        <span style={{ fontSize: THEME.font.size.xs }}>{time}</span>
      </div>

      <div className="flex justify-end px-3">
        <button className="h-11 w-11 relative rounded-xl overflow-visible shadow-lg flex items-center focus:outline-none">
          <img
            src="assets/images/notification.png"
            alt="Notification"
            className="relative w-9 h-9"
          />
        </button>
      </div>
    </div>
  );
};
