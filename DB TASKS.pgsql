-- SQL Task
-- 1. Кол-во юзеров по ролям:

SELECT "role", COUNT("role") 
FROM "Users"
GROUP BY "role";

--
-- 2. Всем юзерам customer 10% кешбэка с заказов сделаных 25.12 - 14.01:

UPDATE "Users" US
SET "balance" = US."balance" + UC."cashback"
FROM (
    SELECT U."id", SUM(C."prize")*0.1 as cashback FROM "Contests" C
    JOIN "Users" U on U."id" = C."userId"
    WHERE C."createdAt" BETWEEN '2020/12/25' AND '2021/01/14'
    GROUP BY U."id"
) as UC
WHERE US."id" = UC."id";

--
-- 3. Для creator. Выплатить 3 юзерам с самым высоким рейтингом 10$


UPDATE "Users" U
SET "balance" = U."balance" + 10
WHERE "id" IN (
    SELECT "id" FROM "Users"
    WHERE "role" = 'creator'
    ORDER BY U."rating" DESC
    LIMIT 3
);


-- NO-SQL Task
db.messages.aggregate([
    {
        $match: { body: { $regex: 'паровоз' } },
    },
    { 
        $group: { 
            _id: null, 
            count: { $sum: 1 } 
        } 
    }
]);