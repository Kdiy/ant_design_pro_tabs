import en_US from './en-US'
import pt_BR from './pt-BR'
import zh_CN from './zh-CN'
import zh_TW from './zh-TW'



export const getMenuJSON = () =>{
  const locale = localStorage.getItem('umi_locale')
  const fullLocale = {
    en_US,
    pt_BR,
    zh_CN,
    zh_TW
  }
  return fullLocale[locale.replace(/\-/g,'_')]
}
