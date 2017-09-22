define([],function () {
    //数据模拟
    var yldata = [
        {
            src : '39ca2071de2136d5c97efebc6b777f63c3504618.jpg',
            price : 0.74,
            name : '晨光（M&G）G-5 中性笔芯 按动中性笔芯  0.5mm'
        },
        {
            src : '8674eaef4062cc171e4d6156ec7f6303e66a9ac8.jpg',
            price : 25.00,
            name : '办公伙伴复印纸 500P'
        },
        {
            src : '5db3e9cbc88493eaca4d0d74f6dcc841d5f28920.jpg',
            price : 24.00,
            name : '欧标A4复印纸 500P'
        },
        {
            src : 'b042bef2f175e13fda839b243ab025ac0e6d6f3d.jpg',
            price : 4.5,
            name : '舒肤佳（Safeguard）  纯白清香型香皂 洗手洗澡 肥皂 115g'
        },
        {
            src : '196c0b70252f5d71b0881c7f3da145daf6280ec9.jpg',
            price : 4.60,
            name : '心相印软抽纸 DT200 200抽 双层 3包/提'
        },
        {
            src : '2d1f18ce158f46395af7a10a08c51ffaf84d2a48.jpg',
            price : 0.11,
            name : '办公伙伴纸杯  230g'
        },
        {
            src : '3b75a722d860158cf41f35125122dc723a7037a0.jpg',
            price : 13.35,
            name : '欧标11孔资料备用袋 透明质感 时尚商务'
        },
        {
            src : 'c417fb0c7314c6cf3e85e03e2640e5f8da275117.jpg',
            price : 18.13,
            name : 'UPM复印纸高白未来 A3/A4 70G'
        },
        {
            src : 'cbc078c057dee4448c5eebf8ca325c1062e3f323.jpg',
            price : 2.80,
            name : '欧标线圈本 混色   螺旋本'
        },
        {
            src : 'd57e7daf744957f3bd18e72d726f59d7301d8986.jpg',
            price : 27.50,
            name : 'UPM复印纸普白新好  A3 70G 4包/箱'
        },
        {
            src : '47357642db3d7ea34bdc872cf6c640bbc91026d6.jpg',
            price : 12.38,
            name : '亚龙复印纸互利  A470G8包入'
        },
        {
            src : '0d0f9fa2a726f4707a11963b4cb4002f56c466ec.jpg',
            price : 7.20,
            name : '欧标只装垃圾袋  45*55cm 30只装 黑色'
        }
    ];
    var kinddata = [
        {
            name : '复印纸',
            des : '低价限量抢购',
            src : '7d3d77d463d900eec45a98c8ac290cd58a4b9310.png',
            kind : 'paper'
        },
        {
            name : '黑盒',
            des : '正品保证',
            src : '8837da9f877708642ec9f94ac875a75ae230efa0.png',
            kind : 'paper'
        },
        {
            name : '传真纸',
            des : '显影清晰 纸粉不脱落',
            src : '4a08dcef894e986963bfed3f9ba42e09899ec69f.png',
            kind : 'paper'
        },
        {
            name : '收银纸',
            des : '不易粘油 不易褪色',
            src : '504b96c4ff632666487dbb11898eade032ad12a7.png',
            kind : 'paper'
        },
        {
            name : '晒鼓',
            des : '健康安全 打印清晰',
            src : '0e18174e17d9072685a3bd2ce86d7bd8383aabeb.png',
            kind : 'paper'
        },
        {
            name : '色带架',
            des : '正品保证 环保安全',
            src : '38cbce8675fce9795a81fc490284565cf63f1c99.png',
            kind : 'paper'
        },
        {
            name : '打印机',
            des : '官方正品 高效打印',
            src : '2d0f49651cc553e221a9ab568ea3bff313da31c2.jpg',
            kind : 'officeEq'
        },
        {
            name : '指纹机',
            des : '彩色液晶屏 指纹打卡快速方便',
            src : '30a1bea893609b4a1dc8bf3843a90bcaee6ade14.jpg',
            kind : 'officeEq'
        },
        {
            name : '传真机',
            des : '连续复印 多种功能于一体',
            src : '8d70414108cabbf60b60f6578c1805bb7cebfe32.jpg',
            kind : 'officeEq'
        },
        {
            name : '点钞机',
            des : '时尚简洁 大气的外观',
            src : '6507279d4de9063d57caf6e6bb812bf37056ea49.jpg',
            kind : 'officeEq'
        },
        {
            name : '一体机',
            des : '立即打印 轻松安装',
            src : 'd393cb1ef0fe129337ad117ae1c6bd75ea4a78c1.jpg',
            kind : 'officeEq'
        },
        {
            name : '一体机',
            des : '立即打印 轻松安装',
            src : 'd393cb1ef0fe129337ad117ae1c6bd75ea4a78c1.jpg',
            kind : 'officeEq'
        },
        {
            name : '装订机',
            des : '最新加热技术 效率更高',
            src : '1e707e3c66a186d7afdfefabe8df7269c8542fb0.jpg',
            kind : 'officeEq'
        },
        {
            name : '塑封机',
            des : '耐高温 清新立体',
            src : '242e719bcedf6de23c7da8a83d2c8e7e40771f8d.jpg',
            kind : 'officeEq'
        },
        {
            name : '投影仪',
            des : '经典之作 商务必备',
            src : 'c4ad210d4a46976ef41d528c09d1c3a4f0ff6e77.jpg',
            kind : 'officeEq'
        },
        {
            name : '碎纸机',
            des : '智能控制系统 自动防卡纸功能',
            src : 'cabb1e9e8f490f1b102ec7536110ec44b86e8fb5.jpg',
            kind : 'officeEq'
        }
    ];
    var trcoldata = [
        {
            name : '工艺礼品',
            des : '口碑好货 限量抢购',
            src : 'ef3e46b21239a21250ae804e94a9e02bb351e17b.jpg',
            kind : 'paper'
        },
        {
            name : '祝福卡',
            des : '创意个性礼卡 新品抢先购',
            src : '9c77a30dc79d66d0e99be0755992490a759c93b0.jpg',
            kind : 'paper'
        },
        {
            name : '名笔',
            des : '精湛工艺 品质书写',
            src : '673180d2c7d75249308b17711a800199e5209953.jpg',
            kind : 'paper'
        },
        {
            name : '节日礼物',
            des : '品质好礼 总有你喜欢',
            src : '303bf956df5a104ff19dd9652d83ba10a42c2357.jpg',
            kind : 'paper'
        }
    ];
    return {
        yldata : yldata,
        kinddata : kinddata,
        trcoldata : trcoldata
    }
});