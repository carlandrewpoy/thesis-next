import { Center, College, Faculty, Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetCollege = () => {
  return useQuery({
    queryKey: ["college"],
    queryFn: async () => {
      const { data } = await axios.get('/api/college');
      return data as College[];
    },
  });
};

export const GetProject = () => {
  return useQuery({
    queryKey: ["[project]"],
    queryFn: async () => {
      const { data } = await axios.get('/api/project');
      return data as Project[];
    },
  });
};

export const GetFaculty = () => {
  return useQuery({
    queryKey: ["[faculty]"],
    queryFn: async () => {
      const { data } = await axios.get('/api/faculty');
      return data as Faculty[];
    },
  });
};

export const GetCenter = () => {
  return useQuery({
    queryKey: ["[center]"],
    queryFn: async () => {
      const { data } = await axios.get('/api/center');
      return data as Center[];
    },
  });
};