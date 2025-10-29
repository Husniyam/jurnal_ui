export interface Lokomotiv {
	_id: string
	nomi: string
	turi: string
	zavodRaqami: string
	ishlabChiqarilganYil?: string
}

export interface CreateLokomotivDto {
	nomi: string
	turi: string
	zavodRaqami: string
	ishlabChiqarilganYil?: string
}
