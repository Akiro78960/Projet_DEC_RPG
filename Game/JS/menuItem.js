class MenuItem{
    constructor(name){
        this.name = name
        this.selected = false
        this.submenuItems = null
    }
    addSubMenu(a){
        this.submenuItems = a
    }
    isSomethingSelected(){
        var foo = false
        $(this.submenuItems).each(function(index, el) {
            if(el.selected){
                foo = true
            }
        })
        return foo
    }
}
