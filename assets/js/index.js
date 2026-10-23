function hideMobileBtn() {
    const mobileBTN = document.getElementById('mobileBTN');
    if (mobileBTN && mobileBTN.attributes['aria-expanded'] && mobileBTN.attributes['aria-expanded'].value === 'true') {
        mobileBTN.click();
    }
}