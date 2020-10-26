export class Partida {
    position: number
    id_baptized: string
    firstname: string
    secondname: string
    lastname: string
    secondlastname: string
    borndate: string
    dpi: string
    sex: string
    id_baptism: string

    folio: string
    book: string
    baptism_date: string
    priest: {
        id_priest: string
        firstname_priest: string
        secondname_priest: string
        lastname_priest: string
        second_lastname_priest: string
        credentials: string
        parish_origin: string
    }
    place: {
        id: string
        name: string
        description: string
    }
    id_address: string
    address: string
    father: {
        id_father: string
        firstname_father: string
        secondname_father: string
        lastname_father: string
        secondlastname_father: string
    }
    mother: {
        id_mother: string
        firstname_mother: string
        secondname_mother: string
        lastname_mother: string
        secondlastname_mother: string
    }
    godfather: {
        id_godfather: string
        firstname_godfather: string
        secondname_godfather: string
        lastname_godfather: string
        secondlastname_godfather: string
    }
    godmother: {
        id_godmother: string
        firstname_godmother: string
        secondname_godmother: string
        lastname_godmother: string
        secondlastname_godmother: string
    }
    manager: {
        id_manager: string
        firstname_manager: string
        secondname_manager: string
        lastname_manager: string
        secondlastname_manager: string
    }
    id_priest: string
    id: string
    id_father: string
    id_mother: string
    id_godfather: string
    id_godmother: string
    id_manager: string


}