export const handleVisibleChange = (visible) => {
    let dropDownContainer = document.getElementById('_fixedDropDownContainer');
    if(dropDownContainer){
        dropDownContainer.style.display = visible ? 'block' : 'none';
    }
};

export const getCustomContainer = ()=> document.getElementById('_fixedDropDownContainer');

export default {
    handleVisibleChange,
    getCustomContainer
}