import React from 'react'
import FaqQuestion from './FaqQuestion'

const Faq = () => {
    return (
        <div id='faq' className='w-full h-full mt-10 p-4 bg-faq-pattern bg-no-repeat bg-contain lg:bg-auto'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-center font-bold text-landing-headline text-5xl'>FAQ</h1>
                <p className='text-center text-landing-headline font-normal tracking-[0.6rem] mt-8'>Распространённые вопросы</p>

                <div className='flex flex-col items-start w-full justify-center gap-5 mt-5'>
                    <FaqQuestion question={'Как скачать?'} answer={'Скачивать приложение не надо, достаточно зайти на сервис :)'} />
                    <FaqQuestion question={'Как добавить метку?'} answer={'После того, как приложение обнаружит Вашу локацию, Вы сможете выбрать категорию и расстояние происшествия, после чего кликнуть на иконку "Отправить". Дополнительно можно указать описание, а так же добавить фото.'} />
                    <FaqQuestion question={'Какой тип информации следует сообщать?'} answer={'В обязательном порядке надо указать категорию ЧП и расстояние. Остальные параметры по желанию'} />
                    <FaqQuestion question={'Можно ли оставаться анонимным при добавлении информации о происшествиях?'} answer={'Конечно! Данные Вашей локации нигде не хранятся. Достаточно лишь зарегистрироваться в приложении.'} />
                    <FaqQuestion question={'Как удалить или изменить добавленную метку на карте?'} answer={'Если метка установлена Вами, то Вы сможете без каких-либо проблем её удалить. Чужую метку может удалить только тот, кто её оставил и администратор приложения.'} />
                    <FaqQuestion question={'Как часто обновляется информация на карте?'} answer={'Информация обновляется каждый раз при входе в приложение и установки метки (либо удалении). Приложение оптиминизировано, поэтому оставлять метку могут даже пользователи с 2G.'} />
                    <FaqQuestion question={'Какие устройства и браузеры поддерживаются для использования приложения?'} answer={'Приложение поддерживается всеми современными браузерами и устройствами с выходом в интернет.'} />
                    <FaqQuestion question={'Как обеспечивается безопасность моих данных?'} answer={'Ваши данные хранятся на удаленном сервере, доступ к которому недоступен рядовому пользователю. Так же, Ваши пароли от аккаунта зашифрованы, в следствие чего данные остаются в безопасности.'} />
                </div>
            </div>

        </div>
    )
}

export default Faq