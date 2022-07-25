import { reactive } from "vue";

type themeType = "black" | "blue"
import baseTopBannerBlack from "@/modules/layout/img/topBanner.png";
import baseTopBannerBlue from "@/modules/layout/img/topBanner1.png";

class ThemeMan {
  protected _theme: themeType = "black";
  get theme() {
    return this._theme;
  }

  readonly themeMap = {
    "black": {
      theme: "black",
      baseTopBanner: baseTopBannerBlack,
      name: "玄夜黑",
      style: {
        "--bg-main": "#343434",
        "--bg-bg": "#2B2B2B",
        "--bg-less": "#666666", //少数,不可点击
        "--bg-table-stripe": "#3E3E3E",  //表格间隔,组件背景
        "--bg-active": "#5B4A3C", //选中背景色
        "--bg-title": "#444444", //标题栏背景色

        "--border": "#444444", //边框
        "--border-active": "#5B4A3C", //选中边框

        "--text-primary": "#FFFFFF",//强调
        "--text-content": "#FFFFFF",//标题,内容
        "--text-info": "#999999", //次要的,icon
        "--text-highlight": "#CCCCCC", //背景高亮文字
        "--text-blueBg": "#FFFFFF", //蓝色背景上的文字
        "--text-unActive": "#999999", //蓝色背景未选中的文字

        "--color-main": "#CC7832", //主色
        "--color-help1": "#3F93B0", //辅助色1
        "--color-help2": "#66AB4D", //辅助色2
        "--color-warning": "#DF606F", //警示色
        "--color-realtime-kpi1": "#CC7832", //实时指标背景色1
        "--color-realtime-kpi2": "#CC7832" //实时指标背景色2
      }
    },
    "blue": {
      theme: "blue",
      baseTopBanner: baseTopBannerBlue,
      name: "典雅蓝",
      style: {
        "--bg-main": "#FFFFFF",
        "--bg-bg": "#F5F6F7",
        "--bg-less": "#EEEEEE", //少数,不可点击
        "--bg-table-stripe": "#F6F6F6",  //表格间隔,组件背景
        "--bg-active": "#E0E9F3", //选中背景色
        "--bg-title": "#346CB0", //标题栏背景色

        "--border": "#DDDDDD", //边框
        "--border-active": "#346CB0", //选中边框

        "--text-primary": "#346CB0",//强调
        "--text-content": "#2B2B2B",//标题,内容
        "--text-info": "#999999", //次要的,icon
        "--text-highlight": "#999999", //背景高亮文字
        "--text-blueBg": "#FFFFFF", //蓝色背景上的文字
        "--text-unActive": "#D6E2EF", //蓝色背景未选中的文字

        "--color-main": "#336CB0", //主色
        "--color-help1": "#48AAAB", //辅助色1
        "--color-help2": "#E6A23C", //辅助色2
        "--color-warning": "#DF606F", //警示色
        "--color-realtime-kpi1": "#346CB0", //实时指标背景色1
        "--color-realtime-kpi2": "#90B7E8" //实时指标背景色2
      }
    }
  };

  changeTheme(theme?: themeType) {
    if(import.meta.env.PROD && theme && theme !== this.theme){
      location.reload()
    }
    if (!theme) {
      theme = <themeType | undefined>localStorage.getItem("_theme") || this.theme;
    }
    const body = document.body;
    this._theme = theme;

    localStorage.setItem("_theme", theme);

    for (const cssVarName in this.cssVarMap) {
      body.style.setProperty(cssVarName, this.cssVarMap[<keyof ThemeMan["cssVarMap"]>cssVarName]);
    }
  }

  get baseTopBanner() {
    return this.themeMap?.[this._theme]?.["baseTopBanner"] || "";
  }

  get cssVarMap() {
    return this.themeMap[this._theme].style;
  }
}

const themeMan = new ThemeMan();
themeMan.changeTheme();
export default reactive(themeMan);
