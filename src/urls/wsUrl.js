// 账号密码登陆
export const loginPWApi = () => {
    return "designer/users_designer/loginPW"
}// 注册验证账号
export const verifyUsersApi = () => {
    return "User/users/verifyUsers"
}
// 注册账号
export const registerApi = () => {
    return "designer/users_designer/register"
}
// 编辑基本信息
export const editInfoApi = () => {
    return "designer/users_designer/editInfo"
}
// 上传实名认证信息
export const setAuthApi = () => {
    return "designer/users_designer/setAuth"
}
// 添加收货地址
export const addAddressApi = () => {
    return "user/users_address/addAddress"
}
// 读取收货地址列表
export const listAddressApi = () => {
    return "user/users_address/listAddress"
}
// 修改收货地址
export const updateAddressApi = () => {
    return "user/users_address/updateAddress"
}
// 删除收货地址
export const delAddressApi = () => {
    return "user/users_address/delAddress"
}
// 读取认证信息
export const getAuthApi = () => {
    return "designer/users_designer/getAuth"
}
// 读取银行卡列表
export const listBankApi = () => {
    return "user/users_bank/listBank"
}
// 添加银行卡
export const addBankApi = () => {
    return "user/users_bank/addBank"
}
// 删除银行卡
export const delBankApi = () => {
    return "user/users_bank/delBank"
}
// 删除银行卡
export const showBankApi = () => {
    return "user/users_bank/showBank"
}
// 设计师作品列表
export const getListWorksApi = () => {
    return "designer/users_designer_works/getListWorks"
}
// 类别列表
export const getListApi = () => {
    return "designer/product_type/getList"
}
// 获取企业列表
export const companyGetListApi = () => {
    return "designer/company/getList"
}
// 获取企业详情
export const showApi = () => {
    return "designer/company/show"
}
// 企业的商品列表
export const shopListApi = () => {
    return "designer/company/shopList"
}
// 指定企业的品牌列表
export const getBrandApi = () => {
    return "company/brand/getBrand"
}
//设计师添加作品
export const addWorksApi = () => {
    return "designer/users_designer_works/release"
}
//设计师的品牌列表
export const brandGetListApi = () => {
    return "designer/brand/getList"
}
//设计师的品牌列表
export const addApi = () => {
    return "designer/brand/add"
}
//删除品牌列表
export const delApi = () => {
    return "designer/brand/del"
}
//删除品牌列表
export const showbrandApi = () => {
    return "designer/brand/show"
}
//赛事列表
export const MatchGetListApi = () => {
    return "designer/Match/getList"
}
//赛事详情
export const MatchShowApi = () => {
    return "designer/Match/show"
}
//我的作品列表
export const designerWorksApi = () => {
    return "designer/users_designer_works/getList"
}
//设计师基本信息
export const myCenterApi = () => {
    return "designer/users_designer/myCenter"
}
// 验证可否投稿赛事
export const verJoinApi = () => {
    return "designer/Match/verJoin"
}
// 投稿
export const JoinApi = () => {
    return "designer/Match/join"
}
// 作品详情
export const workShowApi = () => {
    return "designer/users_designer_works/show"
}
// 参赛作品列表（随机排序,投票）
export const votoWorksApi = () => {
    return "designer/Match/works"
}
// 赛事中我参与的作品
export const myWorksApi = () => {
    return "designer/Match/myWorks"
}
// 验证可否投票
export const verVotoApi = () => {
    return "designer/Match/verVoto"
}
// 投票次数
export const votoCountApi = () => {
    return "designer/Match/votoCount"
}
// 投票
export const setVotoApi = () => {
    return "designer/Match/setVoto"
}
// 参赛作品列表（公示期都可查看（可查看投票情况和名次）,非公示期此接口无数据）
export const worksListApi = () => {
    return "designer/Match/worksList"
}
// 参赛作品列表（公示期都可查看（可查看投票情况和名次）,非公示期此接口无数据）
export const MatchworkShowApi = () => {
    return "designer/Match/workShow"
}
//我的作品
export const getMyWorksApi = () => {
    return "designer/users_designer_works/getList"
}
//删除作品
export const delMyWorksApi = () => {
    return "designer/users_designer_works/del"
}
//作品详细信息
export const getMyWorksshowApi = () => {
    return "designer/users_designer_works/show"
}
//评论作品
export const designerWorkscomment = () => {
    return "designer/users_designer_works/comment"
}
//查看企业商品详情
export const showProductApi = () => {
    return "designer/company/showProduct"
}
//查看企业商品详情
export const AdApi = () => {
    return "company/Ad/getList"
}
//读取设计师基本信息
export const designerMyCenterApi = () => {
    return "designer/users_designer/myCenter"
}
//读取平台系统配置
export const getConfigDataApi = () => {
    return "admin/test/getConfigData"
}
//创建开通vip订单
export const addVipApi = () => {
    return "company/orders/addVip"
}
// 读取订单明细
export const getOrderStatApi = () => {
    return "company/orders/getOrderStat"
}
// pc-微信支付
export const payApi = () => {
    return "pay/Wxpay/pay"
}
//修改作品
export const editMyWorksApi = () => {
    return "designer/users_designer_works/edit"
}
//创建圈子
export const createCircleApi = () => {
    return "company/Circle/createCircle"
}
//我的圈子列表
export const listCircleApi = () => {
    return "company/Circle/listCircle"
}
//我的圈子列表
export const getCircleShowApi = () => {
    return "company/Circle/getCircleShow"
}
//公告列表
export const getListwApi = () => {
    return "company/Circle/getCircleShow"
}
//公告发布
export const notAddApi = () => {
    return "company/circle_notice/add"
}
// 公告详情
export const circle_noticeGetShowApi = () => {
    return "company/circle_notice/getShow"
}
// 公告详情
export const CircleGetCircleShowApi = () => {
    return "company/Circle/getCircleShow"
}
//公告 修改
export const circle_noticeEditApi = () => {
    return "company/circle_notice/edit"
}
// 公告删除
export const circle_noticeDelApi = () => {
    return "company/circle_notice/del"
}
// 公告列表Circle/getCircleShow
export const circle_noticeGetListApi = () => {
    return "company/circle_notice/getList"
}
// 修改圈子
export const editCircleApi = () => {
    return "company/Circle/editCircle"
}
// 解散圈子
export const CircledelApi = () => {
    return "company/Circle/del"
}
// 成员列表
export const CircleGetMemberApi = () => {
    return "company/Circle/getMember"
}
// 成员邀请
export const CircleInvitationApi = () => {
    return "company/Circle/invitation"
}
// 成员移除
export const CircleRemoveApi = () => {
    return "company/Circle/remove"
}
// 成员移除
export const CirclegetCircleApi = () => {
    return "company/Circle/getCircle"
}
// 退出 圈子
export const CircleOutApi = () => {
    return "company/Circle/out"
}

// 论坛帖子列表（圈子发布）
export const CircleGetCircleForumApi = () => {
    return "company/Circle/getCircleForum"
}
//热门话题
export const ForumthemelistApi = () => {
    return "company/Forum_theme/getList"
}
export const ForumReleaseApi = () => {
    return "company/Forum/release"
}
// 设置帖子是否置顶-可批量
export const ForumSetTopApi = () => {
    return "company/Forum/setTop"
}
// 设置帖子是否精华-可批量
export const ForumSetEssApi = () => {
    return "company/Forum/setEss"
}
// 帖子删除
export const ForumDelForumApi = () => {
    return "company/Forum/delForum"
}
// 论坛帖子列表
export const ForumListForumApi = () => {
    return "company/Forum/listForum"
}
// 我的帖子
export const CircleGetForumApi = () => {
    return "company/Circle/getForum"
}
// 评论
export const ForumCommentApi = () => {
    return "company/Forum/comment"
}
// 评论详情
export const ForumShowForumApi = () => {
    return "company/Forum/showForum"
}
// 是否可以投票
export const ForumSeteVotoApi = () => {
    return "company/Forum/seteVoto"
}
// 投票
export const ForumVotoApi = () => {
    return "company/Forum/voto"
}

// 话题帖子
export const ForumThemeApi = () => {
    return "company/Forum_theme/getShow"
}

//创建付费订单
export const ordersAddWorksApi = () => {
    return "company/orders/addWorks"
}
//创建保障金订单
export const bondApi = () => {
    return "company/orders/bond"
}

//投诉
export const ComplaintApi = () => {
    return "user/Complaint/add"
}
export const releaseApi = () => {
    return "company/Activity/release"
}





















