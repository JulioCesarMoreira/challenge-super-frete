export interface FormFields {
    originZipCode: string, // Cep de Origem

    format: 1 | 2 | 3, // Formato, qual posição da lista o formato desajado se encontra

    weight: string, // Peso, usando Kilos como referência, ou seja, 0.3 = 300g & 1 = 1kg 

    height?: string, // Altura

    width?: string, // Largura

    depth?: string, // Comprimento para Caixa / Pacote

    rdepth?: string, // Comprimento para Rolo / Cilindro ou Esfera

    diameter?: string, // Diâmetro para Caixa / Pacote

    rdiameter?: string // Diâmetro para Rolo / Cilindro e Esfera

    haveAdditionalService?: boolean, // Tem Seguro, aviso e mão própria ?

    additionalServices?: Array<'selfHand' | 'acknowledgmentOfReceipt' | 'valueDeclaration'>; // Lista com quais serviços devem adicionar

    valueDeclaration?: string, // Valor declarado do produto

    destinyZipCode: string // Cep de Destino
}

export enum fieldToValidEnum {
    MAIN_PAC,
    PAC,
    MAIN_SEDEX,
    SEDEX,
    MINI,
    ORIGIN_ZIPCODE,
    ORIGIN_ADDRESS,
    DESTINY_ZIPCODE,
    DESTINY_ADDRESS
}