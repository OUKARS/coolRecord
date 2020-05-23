
export const  formatDate  = (date)=>{
	let year = date.getFullYear()
	let month = date.getMonth()+1
	if(month<10)
		month = '0'+month
	let day = date.getDate()
	let formatdate = year+'-'+month+'-'+day
	return formatdate
}

