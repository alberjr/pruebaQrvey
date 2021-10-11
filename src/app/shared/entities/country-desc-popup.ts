export class CountryDescPopup {
   private name= '';
   private  desc= '';
   private flag= '';
   private favorite= false;
   private showPop= false;

   getName() {
        return this.name;
        }
    getDesc() {
        return this.desc;
        }
    getFlag() {
        return this.flag;
    }
    getFavorite() {
        return this.favorite;
    }
    getShowPop() {
         return this.showPop;
         }
    setName(name: string) {
            this.name = name;
    }
    setDesc(desc: string) {
            this.desc = desc;
    }
    setFlag(flag: string) {
            this.flag = flag;
    }
    setFavorite(favorite: boolean) {
            this.favorite = favorite;
    }
    setShowPop(showPop: boolean) {
            this.showPop = showPop;
    }
}