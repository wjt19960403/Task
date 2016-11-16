function createBitmapByName(name) {
    var result = new egret.Bitmap();
    var texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
//# sourceMappingURL=CreateBitmapByName.js.map