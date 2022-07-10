const ttbKey = 'ttblte08091534001'

export default async function handler(req, res) {
    const response = fetch(`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbKey}&QueryType=BlogBest&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101`)
    const jsonData = await (await response).json()
    res.status(200).json(jsonData)
}