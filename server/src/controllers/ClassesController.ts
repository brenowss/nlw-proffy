import db from "../database/connection";
import convertHourToMinutes from "../utils/timeConvertion";

import { Request, Response } from "express";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default new (class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!subject || !week_day || !time) {
      return res.sendStatus(400).json({
        error: "Missing filters!",
      });
    }

    const timeInMintues = convertHourToMinutes(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMintues])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMintues]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }
  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const insertedUsersId = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersId[0];

      const insertedClassesId = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesId[0];

      const class_schedule = schedule.map((item: ScheduleItem) => {
        return {
          class_id,
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
        };
      });

      await trx("class_schedule").insert(class_schedule);

      await trx.commit();

      return res.sendStatus(201);
    } catch (error) {
      trx.rollback();

      console.log(error);

      return res.sendStatus(400).json({
        error: "Unexpected error while creating record.",
      });
    }
  }
})();
