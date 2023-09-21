import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { sharedWorkoutValidationSchema } from 'validationSchema/shared-workouts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.shared_workout
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getSharedWorkoutById();
    case 'PUT':
      return updateSharedWorkoutById();
    case 'DELETE':
      return deleteSharedWorkoutById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSharedWorkoutById() {
    const data = await prisma.shared_workout.findFirst(convertQueryToPrismaUtil(req.query, 'shared_workout'));
    return res.status(200).json(data);
  }

  async function updateSharedWorkoutById() {
    await sharedWorkoutValidationSchema.validate(req.body);
    const data = await prisma.shared_workout.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteSharedWorkoutById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.shared_workout.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
