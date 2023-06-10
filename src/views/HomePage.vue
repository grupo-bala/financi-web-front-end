<template>
  <main class="home">
    <div class="home__container">
      <section class="home__container__callout">
        <div class="home__container__callout__info">
          <h2>
            Controle a sua vida financeira com o <span>Financi</span>
          </h2>
          <p>
            Registre seus gastos e ganhos, planeje seus sonhos
            e desenvolva suas habilidades com cursos gratuitos
          </p>
          <div class="home__container__callout__info__buttons">
            <button>Criar uma conta</button>
            <button>Entrar</button>
          </div>
        </div>
        <img
          class="home__container__callout__mobile"
          src="/MobileScreenshot.png"
          alt="Demonstração da aplicação"
        >
        <div class="home__container__callout__desktop">
          <img
            class="home__container__callout__desktop__transactions"
            src="/Transactions.png"
            alt="Demonstração da visualização de transações"
          >
          <img
            class="home__container__callout__desktop__goals"
            src="/Goals.png"
            alt="Demonstração da visualização de metas"
          >
        </div>
      </section>
      <div class="home__container__buttons">
        <router-link
          to="/register"
        >
          <button>Criar uma conta</button>
        </router-link>
        <router-link
          to="/login"
        >
          <button>Entrar</button>
        </router-link>
      </div>
      <section class="home__container__features">
        <h2>Funcionalidades</h2>
        <ul class="home__container__features__list">
          <li class="home__container__features__list__item">
            <p class="home__container__features__list__item__title">
              <v-icon
                name="md-editnote"
                scale="1.2"
                fill="#49AD5A"
              />
              Controle financeiro
            </p>
            <p class="home__container__features__list__item__description">
              Matenha um registro das suas entradas e saídas,
              organizadas por data e categoria
            </p>
          </li>
          <li class="home__container__features__list__item">
            <p class="home__container__features__list__item__title">
              <v-icon
                name="md-calendarmonth-outlined"
                scale="1.2"
                fill="#49AD5A"
              />
              Metas
            </p>
            <p class="home__container__features__list__item__description">
              Defina seus objetivos e matenha um controle
              de economia para atingí-los
            </p>
          </li>
          <li class="home__container__features__list__item">
            <p class="home__container__features__list__item__title">
              <v-icon
                name="md-newspaper-outlined"
                scale="1.2"
                fill="#49AD5A"
              />
              Notícias
            </p>
            <p class="home__container__features__list__item__description">
              Tenha acesso a uma curadoria de notícias para você
              ficar por dentro das últimas novidades do mundo
              financeiro
            </p>
          </li>
          <li class="home__container__features__list__item">
            <p class="home__container__features__list__item__title">
              <v-icon
                name="md-playcircleoutline"
                scale="1.2"
                fill="#49AD5A"
              />
              Aulas
            </p>
            <p class="home__container__features__list__item__description">
              Desenvolva suas habilidades por meio de aulas gratuitas
              dentro da plataforma
            </p>
          </li>
          <li class="home__container__features__list__item">
            <p class="home__container__features__list__item__title">
              <v-icon
                name="md-insertchartoutlined"
                scale="1.2"
                fill="#49AD5A"
              />
              Relatórios
            </p>
            <p class="home__container__features__list__item__description">
              Gere relatórios em PDF e planilhas e tenha acesso
              a análise gráfica da sua vida financeira por período
              e categoria
            </p>
          </li>
        </ul>
      </section>
      <section class="home__container__about">
        <h2>Sobre</h2>
        <p>
          Esse projeto foi desenvolvido na disciplina de Projeto Integrado II
          no semestre 2023.1 do curso de Engenharia de Software da UFC.
          Você pode visualizar os repositórios do
          <a
            href="https://github.com/grupo-bala/financi-web-front-end"
            target="_blank"
          >
            front end
          </a>
          , do
          <a
            href="https://github.com/grupo-bala/financi-web-back-end"
            target="_blank"
          >
            back end
          </a>
          e o
          <a
            href="#"
            target="_blank"
          >
            documento de descrição do projeto
          </a>
          .
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.home {
  width: 100vw;
  min-height: 100dvh;
  background-color: $bg-color;
  display: flex;
  justify-content: center;
  padding: 2rem;

  &__container {
    &__callout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      &__info {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        text-align: center;

        h2 {
          color: $text-color-white;
          font-size: 2.5rem;

          span {
            color: $financi-green;
          }
        }

        p {
          color: $text-color-white;
          opacity: .8;
          font-size: .9rem;
        }

        &__buttons {
          display: none;
        }
      }

      &__desktop {
        display: none;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      gap: 1rem;
      margin-bottom: 5rem;

      a {
        width: 100%;
      }

      button {
        background-color: $financi-green;
        border: none;
        padding: .8rem;
        border-radius: $border-radius;
        color: $text-color-white;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        width: 100%;
      }
    }

    &__features {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $text-color-white;
      width: 100%;
      gap: 2rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 1.5rem;
      }

      &__list {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;

        &__item {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba($color: $text-color-white, $alpha: .2);
          border-radius: $border-radius;
          padding: 1rem;
          gap: 1rem;

          &__title {
            font-size: 1.1rem;
            font-weight: bold;
          }

          &__description {
            font-size: .9rem;
            opacity: .8;
          }
        }
      }
    }

    &__about {
      color: $text-color-white;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-align: center;

      a {
        color: $financi-green;
      }
    }
  }
}

@media screen and (min-width: 800px) {
  .home {
    &__container {
      width: 100%;
      max-width: 1280px;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &__callout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 5rem;

        &__info {
          padding: 1rem;
          text-align: start;

          &__buttons {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            gap: 1rem;
            align-self: flex-start;

            button {
              background-color: $financi-green;
              border: none;
              padding: .8rem;
              border-radius: $border-radius;
              color: $text-color-white;
              font-weight: bold;
              font-size: 1rem;
              cursor: pointer;
            }
          }
        }

        &__mobile {
          display: none;
        }

        &__desktop {
          display: block;
          position: relative;
          width: 100%;
          min-height: 500px;
          height: 100%;

          img {
            width: 60%;
            max-width: 350px;
          }

          &__transactions {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-80%, -80%);
          }

          &__goals {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-20%, -10%);
          }
        }
      }

      &__buttons {
        display: none;
      }

      &__features {
        align-items: start;

        &__list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;

          &__item:last-child {
            grid-column: 1 / -1;
          }
        }
      }

      &__about {
        text-align: start;
      }
    }
  }
}
</style>