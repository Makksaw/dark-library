function privacyModel(parentSelector) {
    const parent = document.querySelector(parentSelector),
          id = document.querySelector('#checkbox')

    if(localStorage.getItem('checked') === 'true') {
        parent.style.display = 'none'
    } else {
        parent.style.display = 'flex'

        id.addEventListener('click', () => {
            if(id.checked) {
                localStorage.setItem('checked', true)
                setTimeout(() => parent.style.display = 'none', 500)
            } else {
                localStorage.setItem('checked', false)
                parent.style.display = 'none'
                privacyModel('.modal')
            }
        })
    }

}

privacyModel('.modal')