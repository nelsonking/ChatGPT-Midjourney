import styles from "./auth.module.scss";
import { IconButton } from "./button";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";
import BotIcon from "../icons/bot.svg";

function authWecome() {
    let wxwork = /wxwork/i.test(navigator.userAgent);

    // 加载企微登录
    if(wxwork) {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?login_type=CorpApp&appid=wx1a76b035417a979a&agentid=1000079&redirect_uri=https://chat-tools.vhallyun.com/#/auth&state=vhall#wechat_redirect";
    } else {
        window.location.href = "https://login.work.weixin.qq.com/wwlogin/sso/login?login_type=CorpApp&appid=wx1a76b035417a979a&agentid=1000079&redirect_uri=https://chat-tools.vhallyun.com/#/auth&state=vhall#wechat_redirect";
    }
}

export function AuthPage() {
  const access = useAccessStore();
  const searchParams = new URLSearchParams(location.search);
  let codeParam = searchParams.get("code");
  const navigate = useNavigate();

  // 浏览器信息覆盖存储
  if (codeParam && !access.isAuthorized()) {
      access.updateCode(codeParam)
  }

  // 已登录的用户 无需再跳转到登录页
  if (access.isAuthorized()) {
      // window.history.replaceState({ path: '/' }, '/','/');
      navigate(Path.Chat, {
          replace: true,
          relative: "route",
      });
  } else {
      authWecome();
  }

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

    </div>
  );
}
