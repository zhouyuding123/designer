export default function MapLoader() {
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            var url = 'https://webapi.amap.com/maps?v=1.4.4&key=[4809a108fd29d9ff15029338f2e1f49a]&callback=onLoad'
            var script = document.createElement('script')
            script.charset = 'utf-8'
            script.src = url
            script.onerror = reject
            document.head.appendChild(script)
        }
        window.onLoad = () => {
            resolve(window.AMap)
        }
    })
}