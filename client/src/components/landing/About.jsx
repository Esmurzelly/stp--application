import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full h-full my-6 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-landing-headline text-6xl'>О нас</h1>

        <div className="app_desc my-5">
          <h3 className='text-landing-headline text-3xl'>Приложение</h3>
          <p className='mt-2 text-landing-description'>Наше приложение — это инновационный инструмент для отслеживания преступлений и чрезвычайных ситуаций. С его помощью вы можете моментально создавать метки на карте, обмениваться информацией и эффективно реагировать на происходящее.</p>
        </div>

        <hr />

        <div className="team_desc mt-5">
          <h3 className='text-landing-headline text-3xl'>Команда</h3>
          <p className='mt-2 text-landing-description'>Мы — команда, заботящаяся о вашей безопасности. Наша цель — создать безопасное пространство, где вы можете анонимно сообщать о происшествиях, участвовать в улучшении приложения и сделать вашу общину более безопасной и осведомленной.</p>

          <div className='w-full flex flex-col items-start gap-8 mt-4 text-landing-description'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-3'>
                <b>Адам, Fullstack Developer</b>
                <p>Привет! Я Адам, мне 21 год. Я fullstack developer, специализирующийся на создании веб-приложений. Мои проекты часто основаны на технологиях MERN (MongoDB, Express, React, Node.js), что позволяет мне создавать мощные и масштабируемые приложения.</p>
                <p>Вне работы я страстно увлечен технологиями и постоянно ищу новые способы улучшить свои навыки разработки. Если у вас есть вопросы или идеи по улучшению проектов, я всегда открыт для обсуждения.</p>
              </div>

              <div>
                <p>Связаться со мной:</p>
                <ul className='px-2'>
                  <li>Telegram: <a className='underline underline-offset-4' href="https://t.me/Esmurzelly">Esmurzelly</a></li>
                  <li>GitHub: <a className='underline underline-offset-4' href="https://github.com/Esmurzelly">Adam Esmurziev</a></li>
                </ul>
              </div>
            </div>

            <hr className='w-full' />


            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-3'>
                <b>Тимофей, UI/UX дизайнер</b>
                <p>Привет, меня зовут Тимофей! Я - дизайнер приложений, мне 20 лет. Моя страсть - создавать удивительные пользовательские интерфейсы и превращать идеи в эстетически привлекательные и удобные в использовании приложения. Мой опыт в UI/UX дизайне и инструменты, такие как Figma и Adobe Illustrator, позволяют мне превращать концепции в привлекательные и интуитивно понятные интерфейсы.</p>
                <p>Я всегда готов обсудить новые идеи и воплощать их в креативные дизайны!</p>
              </div>

              <div>
                <p>Связаться со мной:</p>
                <ul className='px-2'>
                  <li>Telegram: <a className='underline underline-offset-4' href="https://t.me/Cupprize">Timofey</a></li>
                  <li>VK: <a className='underline underline-offset-4' href="https://vk.com/tshulsky">Timofey Shulky</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default About