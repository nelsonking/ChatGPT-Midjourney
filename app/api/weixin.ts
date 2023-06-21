import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'querystring';

const { QYWX_CORPID, QYWX_AGENTID, QYWX_SECRET } = process.env;

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { code } = req.query;
    const { state } = (req.query.state as string).split(':'); // 将传入的 state 参数中的数据拆分，state 存储了目标路由。

    const { data: accessTokenData } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${QYWX_CORPID}&corpsecret=${QYWX_SECRET}`);
    const { access_token: accessToken } = accessTokenData;

    const { data: userInfoData } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${accessToken}&code=${code}`);
    const { UserId: userId } = userInfoData;

    const { data: userDetailData } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}&userid=${userId}`);
    const { name, email, avatar: avatarUrl } = userDetailData;

    // 此处将用户信息存储到数据库中并获取用户 ID。
    const userIdFromDatabase = storeToDatabase(userId, name, email, avatarUrl);

    // 将 userId 和 state 参数拼接成正确的路由，并重定向到该路由去
    const routePath = `${state}?userId=${userIdFromDatabase}`;
    res.redirect(routePath);
};

export default callbackHandler;
