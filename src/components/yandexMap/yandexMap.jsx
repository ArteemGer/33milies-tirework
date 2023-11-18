import React from 'react';

function YandexMap() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden'}}>
      <a href="https://yandex.ru/maps/org/33_mili/56238521965/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>33 Мили</a>
      <a href="https://yandex.ru/maps/10656/aleksandrov/category/auto_parts_and_auto_goods_store/184105320/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Магазин автозапчастей и автотоваров в Александрове</a>
      <a href="https://yandex.ru/maps/10656/aleksandrov/category/tire_service/184105260/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '28px' }}>Шиномонтаж в Александрове</a>
      <iframe src="https://yandex.ru/map-widget/v1/?ll=38.738261%2C56.396040&mode=poi&poi%5Bpoint%5D=38.737912%2C56.395698&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D56238521965&z=17.4" width="460" height="300" frameBorder="1" allowFullScreen={true} style={{ position: 'relative' }}></iframe>
    </div>
  );
}

export default YandexMap;