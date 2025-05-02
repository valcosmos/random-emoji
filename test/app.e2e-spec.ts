import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;
  let appService: AppService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = app.get<AppService>(AppService);
    server = app.getHttpServer();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(server).get('/').expect(200).expect('Hello World!');
  // });

  describe('/ GET', () => {
    it('should return a 403 when an invalid api key is used', () => {
      return request(server).get('/').set('x-api-key', 'INVALID').expect(403);
    });

    it('should return a 403 when no api key is passed in', () => {
      return request(server).get('/').expect(403);
    });

    it('should return a random emoji', () => {
      const emojis = appService.getEmojis();

      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .expect(
          ({
            body,
          }: {
            body: { data: { emoji: string; browser: string } };
          }) => {
            expect(emojis).toContain(body.data.emoji);
            expect(body.data.browser).toBe(`Unknown`);
          },
        );
    });

    it('should return respective user agent', () => {
      const emojis = appService.getEmojis();

      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .set(
          'user-agent',
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        )
        .expect(
          ({
            body,
          }: {
            body: { data: { emoji: string; browser: string } };
          }) => {
            expect(emojis).toContain(body.data.emoji);
            expect(body.data.browser).toBe(`Mozilla/5.0`);
          },
        );
    });

    it('valid index query param returns respective emoji', () => {
      const emojis = appService.getEmojis();
      const index = 0;
      const indexEmoji = emojis[index];
      return request(server)
        .get(`/?index=${index}`)
        .set('x-api-key', 'SECRET')
        .expect(
          ({
            body,
          }: {
            body: { data: { emoji: string; browser: string } };
          }) => {
            // expect(body.data.emoji).toBe(emojis[0]);
            expect(body.data.emoji).toBe(indexEmoji);
          },
        );
    });

    it('should return a 400 when out of range index is used', () => {
      const emojis = appService.getEmojis();
      const emojiLength = emojis.length;
      const range = emojiLength + 1;
      return request(server)
        .get(`/?index=${range}`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });

    it('should return a 400 the index is a non-number', () => {
      return request(server)
        .get(`/?index=non-number`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });
  });
});
