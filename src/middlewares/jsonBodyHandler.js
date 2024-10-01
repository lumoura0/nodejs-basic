export async function jsonBodyHandler(request, response) {
    // Adicionar cada chunk.
    const buffers = []

    // Coleta os chunk de dados da requisição 
    // Adicionando no array e remontando o conteúdo para strings
    for await (const chunk of request) {
        buffers.push(chunk)
    }

    try {
        //Concatenar os chunk e converter para strings. Em seguida, converte a string para JSON.
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        request.body = null
    }
    // Define o Header de resposta como JSON
    response.setHeader("Content-Type", "application/json")
}