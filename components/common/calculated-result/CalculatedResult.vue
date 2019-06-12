<template>
  <div class="calculated-result">
    <div class="core-screen">
      <div class="core-screen__item">
        <div class="">含み益</div>
        <div class="">+31,230円</div>
      </div>

      <div class="core-screen__item">
        <div class="">含み益</div>
        <div class="">+31,230円</div>
      </div>

      <div class="core-screen__item">
        <div class="">含み益</div>
        <div class="">+31,230円</div>
      </div>
    </div>

    <div class="calculation-details">
      <div class="calculation-details__left">
        <table class="capital-information-table">
          <tbody>
            <tr>
              <th class="capital-information-table__heading">残高</th>
              <td class="capital-information-table__content">921,478 円</td>
            </tr>
            <tr>
              <th class="capital-information-table__heading">有効証拠金</th>
              <td class="capital-information-table__content">921,478 円</td>
            </tr>
            <tr>
              <th class="capital-information-table__heading">余剰証拠金</th>
              <td class="capital-information-table__content">921,478 円</td>
            </tr>
            <tr>
              <th class="capital-information-table__heading">必要証拠金</th>
              <td class="capital-information-table__content">921,478 円</td>
            </tr>
            <tr>
              <th class="capital-information-table__heading">取引所</th>
              <td class="capital-information-table__content">海外</td>
            </tr>
            <tr>
              <th class="capital-information-table__heading">取引通貨単位</th>
              <td class="capital-information-table__content">100,000 通貨</td>
            </tr>
            <tr>
              <th class="capital-information-table__heading">レバレッジ</th>
              <td class="capital-information-table__content">1,000 ％</td>
            </tr>
          </tbody>
        </table>

        <table class="assumed-rates-table">
          <tbody>
            <tr>
              <th class="assumed-rates-table__heading">GBP/USD</th>
              <td class="assumed-rates-table__content">1.27216</td>
            </tr>
            <tr>
              <th class="assumed-rates-table__heading">AUD/USD</th>
              <td class="assumed-rates-table__content">0.69836</td>
            </tr>
            <tr>
              <th class="assumed-rates-table__heading">USD/JPY</th>
              <td class="assumed-rates-table__content">108.131</td>
            </tr>
            <tr>
              <th class="assumed-rates-table__heading">EUR/USD</th>
              <td class="assumed-rates-table__content">1.1266</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="calculation-details__right">
        <div>ドーナツグラフ</div>

        <table class="position-table">
          <thead>
            <tr>
              <th class="position-table__heading">通貨ペア</th>
              <th class="position-table__heading">売買</th>
              <th class="position-table__heading">ロット</th>
              <th class="position-table__heading">注文レート</th>
              <th class="position-table__heading">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GBP/USD</td>
              <td>買</td>
              <td>0.02</td>
              <td>1.27041</td>
              <td><button>編集</button><button>削除</button></td>
            </tr>
            <tr>
              <td>GBP/USD</td>
              <td>買</td>
              <td>0.02</td>
              <td>1.27041</td>
              <td><button>編集</button><button>削除</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.core-screen {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.2em;
  padding: 1em;
  border: solid 2px #007aff;
  background: #d6e9ff;
}

.calculation-details {
  display: flex;

  &__left {
    margin-right: 1.2em;
    width: 33%;
  }

  &__right {
    width: 67%;
  }
}

.capital-information-table {
  margin-bottom: 2em;
  border: solid 1px #d0d0d0;
  padding: 1em;
  width: 100%;

  &__heading {
    text-align: left;
  }

  &__content {
    text-align: right;
  }
}

.assumed-rates-table {
  border-collapse: collapse;
  padding: 1em;
  width: 100%;

  &__heading {
    padding-top: 0.5em;
    padding-bottom: 0.3em;
    border-bottom: solid 1px #000;
    text-align: left;
  }

  &__content {
    padding-top: 0.5em;
    padding-bottom: 0.3em;
    border-bottom: solid 1px #000;
    text-align: right;
  }
}

.position-table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  &__heading {
    padding: 0.5em;
    background: #f5f5f5;
    font-weight: normal;
  }
}
</style>
