export interface Xodim {
	_id: string
	ism: string
	familiya: string
	tel: string
	email?: string
	tabelRaqam: string
	sex: { _id: string; nomi: string }
	jshshir: string
	lavozim?: string
}

export interface CreateXodimDto {
	ism: string
	familiya: string
	tel: string
	email?: string
	tabelRaqam: string
	sex: string
	jshshir: string
	lavozim?: string
}
