# Начало

Вам выпала простая задача выводить список неких сущностей. После того, 
как код `EntityListInital.tsx` был уже закончен команда провела ретро
и решила что теперь весь код должен быть покрыт юнит тестами. 
И без тестов вашу задачу сдать не получится. 

В чем проблема написать юнит тесты на `EntityListInitial.tsx`? 
Проблем сразу несколько: 

- Компонент несет сразу несколько ответственностей: получение данных по API, 
  отображение данных в виде таблицы, подсвечивание строк в зависимости от значений
  сущности
- изменение любого аспекта или поведения этого компонента может уронить 
  сразу все тесты 
- Написанный тест не может быть использован повторно, значит все затраченные 
  усилия будут добавлять ценности только в рамках одного компонента
  
Давайте попробуем переписать этот компонент, исправить описанные проблемы и 
максимально покрыть нашу систему юнит тестами с минимальными усилиями.