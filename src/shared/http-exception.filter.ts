import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()//Este decorador indica que esta classe é um filtro de exceção que captura todas as exceções.
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx=host.switchToHttp()//Obtém o contexto HTTP do ArgumentsHost.
        const response=ctx.getResponse();// Obtém o objeto de resposta.
        const request=ctx.getRequest();//Obtém o objeto de requisição.
        const status = exception.getStatus? exception.getStatus()
        :HttpStatus.INTERNAL_SERVER_ERROR;// Obtém o status da exceção. Se a exceção não tiver
        // um método getStatus, usa o status HTTP 500 (INTERNAL_SERVER_ERROR) como padrão.

        const errorResponse={
            code:status,
            timestamp:new Date().toLocaleDateString(),
            path:request.url,
            method:request.method,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                 ?exception.message || null
                 :'Internal Server Error',
        }

        response.status(status).json(errorResponse);//Envia a resposta de erro 
        //com o status e o corpo JSON definido em errorResponse.
    }
}