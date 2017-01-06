
let cookie : IReactCookie = require('react-cookie');

interface IReactCookie{
    load(name : string, [doNotParse]? : any);
    select([regex] : any);
    save(name : string, val : any, [opt]? : any);
    remove(name : string, [opt]? : any);
}

module LocalFunctions {

    const mod : string = 'test';

    export function localstorage() : boolean {
        try {
            window.localStorage.setItem(mod, mod);
            window.localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    }

    export function sessionstorage() : boolean {
        try {
            window.sessionStorage.setItem(mod, mod);
            window.sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    }

    export function cookies() : boolean {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
        { 
            document.cookie="testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }
}

export module StorageClass {

    function supportLocalStorage() : boolean {
        if (LocalFunctions.localstorage())
            return true;
        else
            return false;
    }

    function supportSessionStorage() : boolean{
        if (LocalFunctions.sessionstorage())
            return true;
        else
            return false;
    }

    function supportCookies() : boolean {
        if (LocalFunctions.cookies())
            return true;
        else
            return false;
    }

    function makeCRCTable() : any[] {
        var c;
        var crcTable = [];
        for (var n = 0; n < 256; n++) {
            c = n;
            for (var k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    }

    export function crc32 (str : any) : any {
        var crcTable = (window as any).crcTable || ((window as any).crcTable = makeCRCTable());
        var crc = 0 ^ (-1);

        for (var i = 0; i < str.length; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;
    }

    export function setLocalStorage (key: string, value: any){
        if (supportLocalStorage()) {
            localStorage.setItem(key, String(value));
        }
        else if (supportCookies()) {
            try {
                cookie.save(key, String(value));
            }
            catch (ex) { 
                console.log("Exception occured in dw.utils.utils.StorageClass.setLocalStorage.Could not set storage cache, check cookie size limits", ex); 
            }
        }
        else
            console.log("utils.utils.StorageClass.setLocalStorage.No cookie or storage support.");
    }

    export function setSessionStorage(key: string, value: any){
        if (supportSessionStorage()) {
            sessionStorage.setItem(key, String(value));
        }
        else if (supportCookies()) {
            try {                
                cookie.save(key, String(value));
            }
            catch (ex) { 
                console.log("Exception occured in dw.utils.utils.StorageClass.setSessionStorage.Could not set session cache, check cookie size limits", ex); 
            }
        }
        else
            console.log("dw.utils.utils.StorageClass.setSessionStorage.No cookie or storage support.");
    }

    export function getLocalStorage (key: string): any {
        var value: string = null;
        if (supportLocalStorage()) {
                value = localStorage.getItem(key);
        }
        else if (supportCookies())
            value = cookie.load(key);
        else
            console.log("dw.utils.utils.StorageClass.getLocalStorage.No cookie or storage support.");
        return value;
    }

    export function getSessionStorage(key: string): any{
        var value: string = null;
        if (supportSessionStorage()) {
                value = sessionStorage.getItem(key);
        }
        else if (supportCookies())
            value = cookie.load(key);
        else
            console.log("dw.utils.utils.StorageClass.getSessionStorage.No cookie or storage support.");
        return value;
    }
}
