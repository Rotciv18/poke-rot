import React from 'react';

function DefaultErrorMessage() {
  return (
    <>
      <h1 className='text-center'>Não conseguimos carregar seus dados</h1>
      <h6 className='text-center'>
        É novo por aqui? Aguarde pelo menos 5 minutos e tente recarregar a
        página para que seu cadastro seja feito
      </h6>
      <h6 className='text-center mt-4'>
        Procure desativar quaisquer bloqueadores de anúncio no seu
        navegador, por favor
      </h6>
    </>
  );
}

export default DefaultErrorMessage;