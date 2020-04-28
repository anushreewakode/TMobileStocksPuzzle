import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksComponent } from './stocks.component';
import { PriceQueryFacadeMock } from './mockData/priceQueryFacade.service.mock';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let priceQueryFacade: PriceQueryFacade;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NoopAnimationsModule, StocksFeatureShellModule],
      providers: [{ provide: PriceQueryFacade, useClass: PriceQueryFacadeMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = TestBed.get(PriceQueryFacade);
  });

  describe('fetchQuote()', function () {

    it('should not call fetchQuote() method for empty input value', async(() => {

      component.stockPickerForm.controls['symbol'].setValue(' ');
      let fetchQuoteSpy = spyOn(priceQueryFacade, 'fetchQuote');

      component.fetchQuote();

      expect(fetchQuoteSpy).toHaveBeenCalledTimes(0);

    }));

    it('should call fetchQuote() method for valid input value', async(() => {

      component.stockPickerForm.controls['symbol'].setValue('AAPL');
      component.stockPickerForm.controls['period'].setValue('One month');
      let fetchQuoteSpy = spyOn(priceQueryFacade, 'fetchQuote');

      component.fetchQuote();

      expect(fetchQuoteSpy).toHaveBeenCalledTimes(1);

    }));

  });

});
