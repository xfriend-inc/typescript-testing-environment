import { describe, expect, test } from 'bun:test';

const nickName = 'edge';

describe('Generic', () => {
  describe('Interfaces Genéricas', () => {
    test('Criar interfaces genéricas para definir tipos flexíveis que podem ser usados com diferentes tipos de dados.', () => {
      /**
       * Neste exemplo, a interface Box é genérica, com um parâmetro de tipo T.
       * Isso permite que você defina tipos de caixas que contêm diferentes tipos de valores.
       */
      interface Box<T> {
        value: T;
      }

      const numberBox: Box<number> = { value: 34 };
      const stringBox: Box<string> = { value: nickName };

      expect(typeof numberBox.value).toBe('number');
      expect(typeof stringBox.value).toBe('string');
    });
  });

  describe('Funções Genéricas', () => {
    test('Funções genéricas para criar funções que trabalham com vários tipos.', () => {
      /**
       * Aqui, a função genérica identity aceita um argumento de qualquer tipo e retorna o mesmo argumento.
       * Isso permite que você use a mesma função com diferentes tipos de entrada e saída.
       */
      function identity<T>(arg: T): T {
        return arg;
      }

      const num: number = identity(34);
      const str: string = identity(nickName);

      expect(num).toBe(34);
      expect(str).toBe('edge');
    });
  });

  describe('Genéricos em Classes', () => {
    test('Aplicar generics a classes, permitindo que as classes aceitem e retornem diferentes tipos.', () => {
      /**
       * Neste exemplo, a classe Container é genérica, com um parâmetro de tipo T.
       * Isso permite que você crie contêineres que armazenem diferentes tipos de valores.
       */
      class Container<T> {
        value: T;
        constructor(value: T) {
          this.value = value;
        }
      }

      const numberContainer = new Container(34);
      const stringContainer = new Container(nickName);

      expect(numberContainer.value).toBe(34);
      expect(stringContainer.value).toBe('edge');
    });
  });

  describe('Herança Genérica', () => {
    test('Estender classes e interfaces genéricas com outras classes genéricas.', () => {
      /**
       * Neste caso, a interface Comparable é genérica, permitindo que você crie tipos comparáveis com base em diferentes tipos.
       * A classe Circle implementa Comparable<Circle>, onde Circle é usado como o tipo genérico que representa o próprio tipo da classe.
       */
      interface Comparable<T> {
        compareTo(other: T): number;
      }

      class Circle implements Comparable<Circle> {
        constructor(public radius: number) {}

        compareTo(other: Circle): number {
          return this.radius - other.radius;
        }
      }

      expect(typeof new Circle(10).compareTo).toBe('function');
    });
  });

  describe('Restrições Genéricas', () => {
    test('Restrições aos tipos que podem ser usados com um parâmetro genérico.', () => {
      /**
       * Neste exemplo, a função printProperty recebe um argumento
       * obj que deve ser um objeto com uma propriedade name do tipo string.
       * A restrição genérica <T extends { name: string }> garante que a função seja
       *  chamada apenas com objetos que atendam a esse critério.
       */
      function printProperty<T extends { name: string }>(obj: T) {
        return obj.name;
      }

      expect(printProperty({ name: 'edge' })).toBe('edge');
    });

    test('Restrições aos tipos que podem ser usados com um parâmetro genérico a parti do construtor', () => {
      /**
       * Neste exemplo, a restrição T extends new (...args: string[]) => any garante que T
       * seja uma classe com um construtor que retorna algum tipo.
       */
      function createInstance<T extends new (...args: string[]) => InstanceType<T>>(
        clazz: T,
        ...args: ConstructorParameters<T>
      ): InstanceType<T> {
        return new clazz(...args);
      }

      class Person {
        constructor(public name: string) {}
      }

      // Acessar informações de tipos específicas.
      type PersonConstructor = typeof Person; // Captura o tipo do construtor da classe Person
      type PersonInstance = InstanceType<PersonConstructor>; // Captura o tipo da instância de Person
      type PersonConstructorArgs = ConstructorParameters<PersonConstructor>; // Captura os tipos dos argumentos do construtor de Person

      const person: PersonInstance = { name: nickName };
      const args: PersonConstructorArgs = [nickName];

      const personInstance = createInstance(Person, nickName);

      expect(person).toStrictEqual({ name: 'edge' });
      expect(args).toStrictEqual(['edge']);
      expect(personInstance.name).toBe('edge');
    });
  });
});
