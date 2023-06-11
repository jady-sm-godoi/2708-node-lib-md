import chalk from "chalk"

function getErrors(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link não encontrado!'
    } else {
        return 'Ops! Algo deu errado!'
    }
}

function getLinksFromListOfObjs(listOfObjs){
    return listOfObjs.map((objLink) => Object.values(objLink).join())
}

async function checkStatus(linksList){
    const statusList = await Promise.all(
        linksList.map(async (url) => {
            try {
                const response = await fetch(url)
                return `${response.status} - ${response.statusText}`
            } catch (error) {
                return getErrors(error)
            }

        })
    )
    return statusList
}

export default async function validList(list){
    const links = getLinksFromListOfObjs(list)
    const urls = await checkStatus(links)
    
    return list.map((obj, index) => (
        {
            ...obj,
            status: urls[index]
        }
    ))
}




